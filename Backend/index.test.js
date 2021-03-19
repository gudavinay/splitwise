const assert = require('assert');

describe('#indexOf()', ()=>{
    it('should return -1 when the value is not present', ()=>{
        assert.equal([1,2,3].indexOf(5),-1)
    })
});