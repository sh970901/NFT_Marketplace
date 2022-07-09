const { expect } = require("chai");

describe("NFTMarketplace", function () {
  let deployer, addr1, addr2, nft, marketplace;
  let feePercent =1;
  let URI=  "Sample URI"
  beforeEach(async function () {
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer, addr1, addr2] = await ethers.getSigners();

    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });
  describe("Deployment", function(){
    it("Should teack name and symbol of the nft collection", async function(){
        expect( await nft.name()).to.equal("DApp NFT")
        expect( await nft.symbol()).to.equal("DAPP")
    })
    it("Should teack feeAcount and feePercent of the nft marketplace", async function(){
        expect( await marketplace.feeAcount()).to.equal(deployer.address)
        expect( await marketplace.feePercent()).to.equal(feePercent)
    })
  })
  describe("Minting NFTs", function(){
    it("Should track each minted NFTs", function(){
        await nft.connect(addr1).mint(URI)
        expect(await nft.tokenCount()).to.equal(1);
        expect(await nft.balanceOf(addr1,address)).to.equal(1);
        expect(await nft.tokenURI(1)).to.equal(URI);

        await nft.connect(addr2).mint(URI)
        expect(await nft.tokenCount()).to.equal(2);
        expect(await nft.balanceOf(addr2.address)).to.equal(1);
    })
  })
});
