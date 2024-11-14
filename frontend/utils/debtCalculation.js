function calculateDebts(expenses, participants) {
    const balances = {};
    participants.forEach(p => balances[p] = 0);
  
    expenses.forEach(expense => {
      const share = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach(p => {
        balances[p] -= share;
      });
      balances[expense.paidBy] += expense.amount;
    });
  
    const debts = [];
    const debtors = participants.filter(p => balances[p] < 0);
    const creditors = participants.filter(p => balances[p] > 0);
  
    debtors.forEach(debtor => {
      let remainingDebt = -balances[debtor];
      creditors.forEach(creditor => {
        if (remainingDebt > 0 && balances[creditor] > 0) {
          const amount = Math.min(remainingDebt, balances[creditor]);
          debts.push({ from: debtor, to: creditor, amount });
          remainingDebt -= amount;
          balances[creditor] -= amount;
        }
      });
    });
  
    return debts;
  }
  
  module.exports = { calculateDebts };