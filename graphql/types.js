import { gql } from 'apollo-server-express';
import { tiposEnums } from '../models/Enums.js';
import { tiposUsuario } from '../models/Usuarios/Tipos.js';
import { tiposProyecto } from '../models/Proyectos/Tipos.js';
import { tiposAvance } from '../models/Avances/Tipos.js';
import { tiposInscripcion } from '../models/Inscripciones/Tipos.js';
import { tiposAutenticacion} from './auth/Tipos.js';

const tiposGlobales = gql`
  scalar Date
`;

export const tipos = [
  tiposGlobales,
  tiposEnums,
  tiposUsuario,
  tiposProyecto,
  tiposAvance,
  tiposInscripcion,
  tiposAutenticacion,
];
