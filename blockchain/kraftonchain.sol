// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract KraftOnChain {
    
    event Added(uint256 index);
    
    struct State{
        string description;
        string person;
    }
    
    struct Product{
        string creator;
        string kraftName;
        uint256 kraftId;
        string date;
        uint256 totalStates;
        mapping (uint256 => State) positions;
    }
    
    mapping(uint => Product) allProducts;
    uint256 items=0;
    
    function concat(string memory _a, string memory _b) public pure returns (string memory){
        bytes memory bytes_a = bytes(_a);
        bytes memory bytes_b = bytes(_b);
        string memory length_ab = new string(bytes_a.length + bytes_b.length);
        bytes memory bytes_c = bytes(length_ab);
        uint k = 0;
        for (uint i = 0; i < bytes_a.length; i++) bytes_c[k++] = bytes_a[i];
        for (uint i = 0; i < bytes_b.length; i++) bytes_c[k++] = bytes_b[i];
        return string(bytes_c);
    }
    
    function addItem(string memory _source,string memory _text, string memory _date) public returns (bool) {
        Product memory newItem = Product({creator: _source, totalStates: 0,kraftName: _text, kraftId: items, date: _date});
        allProducts[items]=newItem;
        items = items+1;
        emit Added(items-1);
        return true;
    }
    
    function addState(string memory _person, uint _productId, string memory _date, string memory _location) public returns (string memory) {
        require(_productId<=items);
        string memory desc="<br><br><b>Date: ";
        desc=concat(desc, _date);
        desc=concat(desc, "</b><br>Location: ");
        desc=concat(desc, _location);
        
        State memory newState = State({person: _person, description: desc});
        
        allProducts[_productId].positions[ allProducts[_productId].totalStates ]=newState;
        
        allProducts[_productId].totalStates = allProducts[_productId].totalStates +1;
        return desc;
    }
    
    function searchProduct(uint _productId) public view returns (string memory) {
        require(_productId<=items);
        string memory output="Product Name: ";
        output=concat(output, allProducts[_productId].kraftName);
        output=concat(output, "<br>Manufacture Date: ");
        output=concat(output, allProducts[_productId].date);
        
        for (uint256 j=0; j<allProducts[_productId].totalStates; j++){
            output=concat(output, allProducts[_productId].positions[j].description);
        }
        
        return output;
    }
    
}