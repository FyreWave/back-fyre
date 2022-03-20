import {Controller, Http} from "xpresser/types/http";


const AppController = <Controller.Object>{
    /**
     * Controller name.
     * @type {string}
     */
    name: 'AppController',

    /**
     * Index Method for "/"
     * @returns {string}
     */

    index(http) {
        return {
            message: "No index access allowed!"
        };
    },

    ping(){


        return {
            message: 'pong'
        }
    },




    api404(http: Http): Http.Response {
        return http.toApiFalse(
            {
                error: 404,
            },
            404
        );
    },
};

export = AppController;
