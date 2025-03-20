const Database = {
    LocalStorage: {
        Data: 'db_data',
        Iteration: 'db_iteration'
    },
    Path: {
        Iteration: '/meta/db_iteration'
    }
} as const;


export default Database;