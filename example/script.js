import bobIndex from '../src/index';

new bobIndex({
    element: "app",
    vars: {
        test: "YeaAHHHH",
        myVariable: "Testing Variable"
    },
    // created() {
    //     console.log("Created");
    // },
    // mounted() {
    //     console.log("Mounted");
    //     this.funcs.setTest.call(this,'TEST')
    // },
    // funcs: {
    //     setTest(x) {
    //         this.vars.test = x;
    //     },
    //     changeTest() {
    //         this.vars.test = 'CHANGE SUCCESSFUL';
    //     }
    // }
});