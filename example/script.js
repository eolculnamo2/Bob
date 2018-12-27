import bobIndex from '../src/index';

new bobIndex({
    element: "app",
    vars: {
        test: "YeaAHHHH",
        myVariable: "Testing Variable"
    },
    created() {
        console.log("Created");
    },
    mounted() {
        console.log("Mounted");
        //this.funcs.setTest('TEST')
        this.vars.test = "x";
    },
    funcs: {
        setTest(x) {
            //this.vars.test = "x";
        }
    }
});