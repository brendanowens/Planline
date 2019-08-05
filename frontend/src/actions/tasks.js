import axios from 'axios';
import {ADD_PROJECT_TASK, ADD_TASK_CATEGORY} from "./types";
import {createMessage, returnErrors} from './messages';
import {tokenConfig} from "./auth";