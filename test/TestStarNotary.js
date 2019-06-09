const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;


contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});


it('has correct name', async () => {
    let instance = await StarNotary.deployed();
    let starName = await instance.starName.call();
    assert.equal(starName, "Awesome Udacity Star");
});

it('can be claimed', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
});

it('can change ownership', async () => {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1];
    await instance.claimStar({from: owner});
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({from: secondUser});
    let newOwner = await instance.starOwner.call();
    assert.equal(newOwner, secondUser);
});

it('can change star name', async () => {
    let instance = await StarNotary.deployed();
    let prevName = await instance.starName.call();
    assert.equal(prevName, "Awesome Udacity Star");
    let newName = "New Star Name";
    await instance.renameStar(newName, {from: owner});
    let updatedName = await instance.starName.call();
    assert.equal(newName, updatedName);
});