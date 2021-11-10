/**
 * This is the function for the backend
 */
 const { MerkleTree } = require('merkletreejs');
 const keccak256 = require('keccak256');

 const whiteListArray = require('./whitelist.js');
 const leaves = whiteListArray.map(v => keccak256(v));
 const tree = new MerkleTree(leaves, keccak256, { sort: true });
 const root = tree.getHexRoot();
 const leaf = keccak256(inputs.address);
 const proof = tree.getHexProof(leaf);
 const verified = tree.verify(proof, leaf, root);

 if (verified) {
     return exits.success({
         message: 'WHITE_LISTED', data: {
             proof: proof
         }
     });

 } else {
     return exits.success({ message: 'NOT_WHITELISTED' });

 }
