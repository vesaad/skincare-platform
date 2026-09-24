import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../shared/services/api";

import {
  resetRoutine,
  setRoutine,
  setProfile,
  setLoading,
  setSavedRoutineId,
} from "../routines/routine.slice";