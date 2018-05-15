import * as Knex from 'knex';
import { getConfig } from 'config';

let _instance: Knex;

export const getDatabaseClient = () => _instance || (_instance = Knex(getConfig().database));
