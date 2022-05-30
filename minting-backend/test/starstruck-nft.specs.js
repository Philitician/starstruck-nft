const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Starstruck NFT', () => {
  it('Should be possible to mint NFT', async () => {
    // Arrange
    // Deploying clean contract
    const StarstruckNFT = await ethers.getContractFactory('StarstruckNFT');
    const baseUri = 'ipfs://QmWYrDXg8irPMGzx7UHhi4csETi5Qp2hRLQvnNZuNg9HQT/';
    const starstruckNFT = await StarstruckNFT.deploy('Starstruck', 'SS', 10, baseUri);
    await starstruckNFT.deployed();

    // Ensuring no NFTs have been minted for the owner
    const owner = await starstruckNFT.owner();
    expect(await starstruckNFT.balanceOf(owner)).to.equal(0);

    // Act
    // Minting a NFT
    expect(await starstruckNFT.name()).to.equal('Starstruck');
    const mintTx = await starstruckNFT.mintTo(owner);
    await mintTx.wait();
    
    // Assert
    expect(await starstruckNFT.balanceOf(owner)).to.equal(1);
  })

  it('Should be possible to get uri for my nft', async () => {
    // Arrange
    // Deploying clean contract
    const StarstruckNFT = await ethers.getContractFactory('StarstruckNFT');
    const baseUri = 'ipfs://QmWYrDXg8irPMGzx7UHhi4csETi5Qp2hRLQvnNZuNg9HQT/';
    const expectedUri = `${baseUri}1.json`;
    const starstruckNFT = await StarstruckNFT.deploy('Starstruck', 'SS', 10, baseUri);
    await starstruckNFT.deployed();

    // Ensuring no NFTs have been minted, meaning 0 total supply
    expect(await starstruckNFT.totalSupply()).to.equal(0);

    // Minting a NFT
    expect(await starstruckNFT.name()).to.equal('Starstruck');
    const mintTx = await starstruckNFT.mintTo(await starstruckNFT.owner());
    await mintTx.wait();

    // Act
    // Getting uri for my nft
    const actualUri = await starstruckNFT.getMyNftUri();

    // Assert
    expect(expectedUri).to.equal(actualUri);
  })

  it('Should be possible to see if I am the owner of the contract', async () => {
    // Arrange
    // Deploying clean contract
    const StarstruckNFT = await ethers.getContractFactory('StarstruckNFT');
    const baseUri = 'ipfs://QmWYrDXg8irPMGzx7UHhi4csETi5Qp2hRLQvnNZuNg9HQT/';
    const starstruckNFT = await StarstruckNFT.deploy('Starstruck', 'SS', 10, baseUri);
    await starstruckNFT.deployed();

    // Act
    // Getting if I am the owner of the contract
    const actualIsOwner = await starstruckNFT.isOwner();

    // Assert
    expect(actualIsOwner).true;
  })
})