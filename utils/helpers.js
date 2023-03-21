const dayjs = require('dayjs');

module.exports = {
  formatTime: (date) => {
    return date.toLocaleTimeString();
  },
  formatDate: (date) => {
    return dayjs().format('ddd, DD/MM/YYYY,  hh:mm:ss a');
    // `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    //   new Date(date).getFullYear() + 5
    // }`;
  },
};

// dayjs().format('ddd, DD/MM/YYYY at hh:mm:ss a');

// module.exports = {
//   get_emoji: () => {
//     const randomNum = Math.random();
//     let book = "📗";

//     if (randomNum > 0.7) {
//       book = "📘";
//     } else if (randomNum > 0.4) {
//       book = "📙";
//     }

//     return `<span for="img" aria-label="book">${book}</span>`;
//   },
// };
