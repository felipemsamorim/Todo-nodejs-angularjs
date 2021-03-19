
module.exports = (sequelize,Sequelize) => {
    return sequelize.define('TodoItems',{
        Id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        Descricao: Sequelize.STRING,
        Status: Sequelize.INTEGER,
        Email: Sequelize.STRING,
        RetornoCount: Sequelize.INTEGER,
        NomeResp: Sequelize.STRING
    }
    ,
    {
        timestamps: false,
        freezeTableName : true,
    });
}