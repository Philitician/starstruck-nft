// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract StarstruckNFT is ERC721, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string baseURI;
    uint256 maxSupply;
    bool paused = false;

    constructor(string memory _name, string memory _symbol, uint256 _maxSupply, string memory _initBaseURI) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        maxSupply = _maxSupply;
    }

    function mintTo(address receiver) public onlyOwner {
        require(!paused);
        require(balanceOf(receiver) < 1);
        _tokenIds.increment();
        require(maxSupply >= _tokenIds.current());
        _safeMint(receiver, _tokenIds.current());
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(_baseURI()).length > 0
            ? string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"))
            : "";
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner();
    }

    function setPaused() public onlyOwner {
        paused = true;
    }

    function setUnpaused() public onlyOwner {
        paused = false;
    }

    function getNftUriOfAccount(address account) public view returns (string memory) {
        uint256 tokenId = tokenOfOwnerByIndex(account, 0);
        return tokenURI(tokenId);
    }

    // Commented function for retrieving all NFT URIs in case owning multiple NFTs were supported
    // function getMyNftUris() public view returns (string[] memory) {
    //     uint256 nftBalance = balanceOf(msg.sender);
    //     string[] memory tokenUris = new string[](nftBalance);
    //     for(uint256 i = 0; i < nftBalance; i++) {
    //         uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
    //         tokenUris[i] = tokenURI(tokenId);
    //     }
    //     return tokenUris;
    // }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}