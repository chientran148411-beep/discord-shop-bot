module.exports = (amount, content) => {

  return `https://img.vietqr.io/image/MB-${process.env.BANK_NUMBER}-compact2.png?amount=${amount}&addInfo=${content}`;

};
