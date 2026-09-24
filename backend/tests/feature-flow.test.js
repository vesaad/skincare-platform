// Run: node backend/tests/feature-flow.test.js
// DB/ML are simulated; no real database or network requests are made.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '../..');
const before = process.argv.includes('--compare-before')
  ? JSON.parse(fs.readFileSync(0, 'utf8')) : null;
const clock = new Date('2026-09-23T12:00:00Z').getTime();
class FixedDate extends Date {
  constructor(...args) { super(...(args.length ? args : [clock])); }
  static now() { return clock; }
}
const clone = (value) => value === undefined ? null : JSON.parse(JSON.stringify(value));

async function run(test, originals) {
  const calls = [], logs = [], cache = new Map();
  const user = { id: 7, email: 'test@example.com', firstName: 'Test', passwordHash: 'hash', isActive: true };
  const rows = [{ id: 1, name: 'Product', price: 12, createdAt: '2026-01-01' }];
  const db = new Proxy({}, { get: (_, model) => new Proxy({}, {
    get: (_, method) => async (...args) => {
      const name = `${model}.${method}`;
      calls.push([name, clone(args)]);
      if (test.failAt === calls.length) throw new Error('DB failed');
      const data = args[0];
      if (name === 'user.findUnique') {
        if (test.noUser) return null;
        if (data?.include) return { ...user, userRoles: test.noRole ? [] : [{ role: { name: 'Admin' } }] };
        if (test.register && data?.where?.email) return test.existingUser ? { ...user } : null;
        return { ...user };
      }
      if (name === 'role.findUnique') return test.noRole ? null : { id: 2, name: 'User' };
      if (name === 'refreshToken.findFirst') return test.noToken ? null : {
        userId: 7, expiresAt: new FixedDate(clock + (test.expired ? -1 : 100000)),
      };
      if (name === 'user.create') return { ...user };
      if (name === 'user.update') return { ...user, isActive: data.data.isActive };
      if (method === 'findMany') return clone(rows);
      if (method === 'groupBy') return [{ category: 'Cleanser', _count: { id: 3 } }];
      if (method === 'count') return data ? 2 : 3;
      if (method === 'findFirst') return test.noRoutine ? null : { id: 9, routineSteps: [] };
      return { id: 9, count: 1 };
    },
  }) });
  const model = { create: async (data) => {
    calls.push(['assessment.create', clone(data)]);
    if (test.saveError) throw new Error('Save failed');
    return { id: 1 };
  } };
  function load(file) {
    file = file.replaceAll('\\', '/');
    if (file.endsWith('skin-assessment-log.model.js')) return model;
    if (cache.has(file)) return cache.get(file).exports;
    const code = originals ? originals[file] : fs.readFileSync(path.join(root, file), 'utf8');
    if (code === undefined) throw new Error('Missing baseline: ' + file);
    const module = { exports: {} };
    cache.set(file, module);
    const context = {
      module, exports: module.exports, Date: FixedDate,
      process: { env: { JWT_SECRET: 'test-only' } },
      console: { log: (...args) => logs.push(clone(args)), error: (...args) => logs.push(clone(args)) },
      fetch: async (url, options) => {
        calls.push(['fetch', url, clone(options)]);
        if (test.networkError) throw new Error('Network failed');
        return { ok: !test.mlError, status: 422, json: async () => {
          if (test.jsonError) throw new Error('Invalid JSON');
          return test.mlError || { routine: 'Hydration Routine', confidence: 90, products: [] };
        } };
      },
      require: (specifier) => {
        if (specifier === '@prisma/client') return { PrismaClient: function () { return db; } };
        if (specifier === 'bcryptjs') return {
          compare: async (...args) => { calls.push(['bcrypt.compare', clone(args)]); return !test.badPassword; },
          hash: async (...args) => { calls.push(['bcrypt.hash', clone(args)]); return 'hash'; },
        };
        if (specifier === 'jsonwebtoken') return { sign: (...args) => {
          calls.push(['jwt.sign', clone(args)]); return JSON.stringify(args[0]);
        } };
        if (specifier === 'crypto') return { ...crypto, randomBytes: (size) => Buffer.alloc(size, 1) };
        if (!specifier.startsWith('.')) return require(specifier);
        let target = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier));
        if (!target.endsWith('.js')) target += '.js';
        return load(target);
      },
    };
    vm.runInNewContext(code, context, { filename: file });
    return module.exports;
  }
  const source = originals ? test.oldFile || test.file : test.file;
  const handler = load('backend/src/features/' + source)[test.action];
  const response = { status: 200, headers: {} };
  const res = {
    status: (status) => { response.status = status; return res; },
    json: (body) => { response.body = clone(body); return res; },
    header: (key, value) => { response.headers[key] = value; return res; },
    attachment: (name) => { response.attachment = name; return res; },
    send: (body) => { response.body = body; return res; },
  };
  await handler({ user: { userId: 7 }, params: { id: '7' }, body: test.body || {}, query: {} }, res);
  return { response, calls, logs };
}

const cases = [];
function add(file, action, extra = {}) { cases.push({ file, action, ...extra }); }
for (const file of ['admin/admin-user.controller.js', 'admin/admin-product.controller.js']) {
  const isUser = file.includes('admin-user');
  for (const action of isUser ? ['getAll', 'toggleStatus', 'assignRole', 'deleteUser', 'exportUsers'] : ['getAll', 'create', 'update', 'delete', 'exportProducts']) {
    add(file, action, { body: { roleId: '2', name: 'Product' }, expectedStatus: action === 'create' ? 201 : 200 });
    add(file, action, { failAt: 1, expectedStatus: 500 });
  }
}
add('admin/admin-user.controller.js', 'toggleStatus', { noUser: true, expectedStatus: 404 });
for (const action of ['toggleStatus', 'assignRole', 'deleteUser']) add('admin/admin-user.controller.js', action, { failAt: 2, expectedStatus: 500, body: { roleId: '2' } });
add('admin/admin-dashboard.controller.js', 'getStats');
for (let failAt = 1; failAt <= 4; failAt++) add('admin/admin-dashboard.controller.js', 'getStats', { failAt, expectedStatus: 500 });
const routine = { routineType: 'Hydration Routine', products: [{ product_id: 1, step: 'Cleanser' }, { product_id: 2 }] };
add('routines/routine.controller.js', 'saveRoutine', { body: routine, expectedStatus: 201 });
for (const body of [{}, { routineType: 'x', products: [] }, { routineType: 'x', products: 'bad' }]) add('routines/routine.controller.js', 'saveRoutine', { body, expectedStatus: 400 });
for (const failAt of [1, 2]) add('routines/routine.controller.js', 'saveRoutine', { body: routine, failAt, expectedStatus: 400 });
for (const options of [{}, { noRoutine: true }, { failAt: 1, expectedStatus: 500 }]) add('routines/routine.controller.js', 'getActiveRoutine', options);
for (const options of [
  { body: { routineId: '9', rating: '4', notes: 'Good' }, expectedStatus: 201 },
  { body: { routineId: '9', rating: null, notes: '' }, expectedStatus: 201 },
  { body: {}, expectedStatus: 400 },
  { body: { routineId: '9' }, failAt: 1, expectedStatus: 400 },
]) add('progress/progress.controller.js', 'createProgressLog', { oldFile: 'routines/progress.controller.js', ...options });
for (const Age of ['18–24', '25-34', '55+', '31', 40]) add('assessment/assessment.controller.js', 'assess', { body: { Age, Acne_Severity: '2', Skin_Type: 'Dry' } });
for (const options of [
  { mlError: { detail: 'Invalid input' }, expectedStatus: 422 },
  { mlError: { error: 'No prediction' }, expectedStatus: 422 },
  { mlError: {}, expectedStatus: 422 },
  { networkError: true, expectedStatus: 500 },
  { jsonError: true, expectedStatus: 500 },
  { saveError: true, expectedStatus: 500 },
]) add('assessment/assessment.controller.js', 'assess', { body: { Age: 22 }, ...options });
const login = { email: 'test@example.com', password: 'password' };
for (const options of [{}, { noRole: true }, { noUser: true, expectedStatus: 400 }, { badPassword: true, expectedStatus: 400 }, { failAt: 1, expectedStatus: 400 }, { failAt: 3, expectedStatus: 400 }, { failAt: 5, expectedStatus: 400 }]) add('auth/auth.controller.js', 'login', { body: login, ...options });
for (const options of [{}, { noRole: true }, { existingUser: true, expectedStatus: 400 }, { failAt: 3, expectedStatus: 400 }]) add('auth/auth.controller.js', 'register', { register: true, body: { ...login, firstName: 'Test', lastName: 'User' }, expectedStatus: 201, ...options });
for (const options of [{}, { noToken: true, expectedStatus: 401 }, { expired: true, expectedStatus: 401 }, { body: {}, expectedStatus: 401 }, { failAt: 1, expectedStatus: 401 }, { failAt: 2, expectedStatus: 401 }, { failAt: 4, expectedStatus: 401 }, { failAt: 5, expectedStatus: 401 }]) add('auth/auth.controller.js', 'refresh', { body: { refreshToken: 'old-token' }, ...options });
for (const options of [{}, { body: {}, expectedStatus: 400 }, { failAt: 1, expectedStatus: 400 }]) add('auth/auth.controller.js', 'logout', { body: { refreshToken: 'old-token' }, ...options });

(async () => {
  for (const test of cases) {
    const current = await run(test, null);
    const label = `${test.file}:${test.action} ${JSON.stringify(test)}`;
    assert.equal(current.response.status, test.expectedStatus || 200, label);
    if (before) assert.deepEqual(current, await run(test, before), label);
  }
  console.log(`${cases.length} feature-flow scenarios passed${before ? '; responses, headers, logs and DB/ML call arguments match the pre-refactor code' : ''}.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
