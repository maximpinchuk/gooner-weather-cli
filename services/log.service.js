import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
};

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
};

const printHelp = () => {
  console.log(
    dedent(`
      ${chalk.bgCyan(' HELP ')}
      Без параметров — вывод погоды
      -c [CITY] для установки города
      -h для вывода помощи
      -t [API_KEY] для сохранения токена
    `)
  );
};

const printForcast = (data) => {
  console.log(
    dedent(`
      ${chalk.bgYellowBright(' WEATHER ')} Погода в городе ${data.name}
      -----------
      ${chalk.greenBright(data.weather[0].description)}
      🌡️  Температура: ${chalk.greenBright(`${Math.round(data.main.temp)}°C`)}
      💨  Скорость ветра: ${chalk.greenBright(`${data.wind.speed} м/с`)}
    `)
  );
};

export { printError, printSuccess, printHelp, printForcast };
