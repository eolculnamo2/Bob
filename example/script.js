import bobIndex from '../src/index';

new bobIndex({
    element: document.getElementById('app'),
    vars: {
        test: "YeaAHHHH",
        myVariable: "Testing Variable"
    },
    created() {
        console.log("Created");
    },
    mounted() {
        console.log("Mounted");
        console.log(this);
        //this.test();
        this.funcs.test.call(this);
        // this.funcs.setTest.call(this,'TEST')
    },
    funcs: {
        test() {
            // This works because of BindToBobject.ts
            console.log(this.vars)
        },
        setTest(x) {
            this.vars.test = x;
        },
        changeTest() {
            this.vars.test = 'CHANGE SUCCESSFUL';
        }
    }
});