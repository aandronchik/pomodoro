export function secondsToStr(
  sec: number,
  floor: 'h' | 'm' | 's' = 's',
  lengthCase: 'short' | 'normal' | 'full' = 'full',
  giventCase: boolean = false
): string {
  const seconds = sec % 60;
  sec -= seconds;

  const minutes = Math.floor((sec % (60 * 60)) / 60);
  sec -= minutes * 60;

  const hours = Math.floor((sec % (60 * 60 * 60)) / (60 * 60));

  let timeStr = '';

  if (hours) {
    let hoursWord: string;

    switch (lengthCase) {
      case 'short':
        hoursWord = 'ч';
        break;

      case 'normal':
      case 'full':
        hoursWord = 'час';
    }

    let hoursEnding = '';

    if (lengthCase === 'full') {
      if (giventCase) {
        if (hours % 10 === 1) hoursEnding = 'а';
        else hoursEnding = 'ов';
      } else {
        if (
          hours % 10 === 0 ||
          (hours % 10 >= 5 && hours % 10 <= 9) ||
          (hours % 100 >= 11 && hours % 100 <= 19)
        )
          hoursEnding = 'ов';
        else if (hours % 10 >= 2 && hours % 10 <= 4) hoursEnding = 'а';
        else if (hours % 10 === 1) hoursEnding = '';
      }
    }

    timeStr = `${hours}\u00A0${hoursWord}${hoursEnding} `;
    if (floor === 'h') return timeStr.trim();
  }

  if (minutes) {
    let minutsWord: string;

    switch (lengthCase) {
      case 'short':
        minutsWord = 'м';
        break;

      case 'normal':
      case 'full':
        minutsWord = 'мин';
        break;
    }

    let minutesEnding = '';

    if (lengthCase === 'full') {
      minutesEnding = 'ут';

      if (giventCase) {
        if (minutes % 10 === 1) minutesEnding += 'ы';
      } else {
        if (!(minutes % 100 >= 11 && minutes % 100 <= 19)) {
          if (minutes % 10 === 1) minutesEnding += 'а';
          if (minutes % 10 >= 2 && minutes % 10 <= 4) minutesEnding += 'ы';
        }
      }
    }

    timeStr += `${minutes}\u00A0${minutsWord}${minutesEnding} `;
    if (floor === 'm') return timeStr.trim();
  }

  if (seconds || (!hours && !minutes)) {
    let secondsWord: string;

    switch (lengthCase) {
      case 'short':
        secondsWord = 'с';
        break;

      case 'normal':
      case 'full':
        secondsWord = 'сек';
        break;
    }

    let secondsEnding = '';

    if (lengthCase === 'full') {
      secondsEnding = 'унд';

      if (giventCase) {
        if (seconds % 10 === 1) secondsEnding += 'ы';
      } else {
        if (!(seconds % 100 >= 11 && seconds % 100 <= 19)) {
          if (seconds % 10 === 1) secondsEnding += 'а';
          if (seconds % 10 >= 2 && seconds % 10 <= 4) secondsEnding += 'ы';
        }
      }
    }

    timeStr += `${seconds}\u00A0${secondsWord}${secondsEnding} `;
  }

  return timeStr.trim();
}
