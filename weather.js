#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError, printForcast } from "./services/log.service.js";
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранён');
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printForcast(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город.');
    } else if (e?.response?.status === 401) {
      printError('Неверно указан токен.');
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.c) {
    return saveCity(args.c);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

initCLI();
