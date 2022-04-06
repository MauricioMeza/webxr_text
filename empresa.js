class Empresa{
    constructor(){
        this.vecs = [this.initiateArray(), this.initiateArray(), this.initiateArray()]; 
        //var ncsd = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]; 
        //var vard = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        //var canl = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        //this.vecs = [ncsd, canl, vard]
    }

    initiateArray(){
        var arr = [];
        for(var i=0; i<20; i++){
            const x = Math.random()
            arr.push(x < 0.75);
        }
        return arr;
    }
}export default Empresa