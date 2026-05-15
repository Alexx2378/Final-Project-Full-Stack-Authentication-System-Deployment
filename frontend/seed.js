const accountsKey = 'angular-21-auth-accounts';
localStorage.removeItem(accountsKey);
const accounts = [{
    id: 1,
    title: 'Mr',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'Admin',
    isVerified: true,
    created: new Date().toISOString()
}];
localStorage.setItem(accountsKey, JSON.stringify(accounts));
console.log('CLEAN SEED SUCCESS: admin@example.com / password123');
