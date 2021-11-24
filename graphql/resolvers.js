import { resolversProyecto } from '../models/Proyectos/Resolvers.js';
import { resolversUsuario } from '../models/Usuarios/Resolvers.js';
import { resolversAvance } from '../models/Avances/Resolvers.js';
import { resolverInscripciones } from '../models/Inscripciones/Resolvers.js';
import { resolversAutenticacion } from './auth/Resolvers.js';

export const resolvers = [
  resolversUsuario,
  resolversProyecto,
  resolversAvance,
  resolverInscripciones,
  resolversAutenticacion,
];
