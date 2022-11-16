const conn=require("../config/server");
const pool=conn();

async function saveEmp({idemp,
    empresa}){
    const iSql = `CALL sp_empinsert ('${idemp}','${empresa}')`;
    const result = await pool.query(iSql);
    return result[0][0];
}
async function delEmp({id}){
    const iSql = `CALL sp_empdel('${id}')`;
    const result = await pool.query(iSql);
    return result[0][0];
}
async function getEmp(){
    const iSql = `call empowerment.sp_empselect`;
    console.log(iSql)
    const result = await pool.query(iSql);
    return result[0][0];
}
module.exports={
    saveEmp,
    delEmp,
    getEmp
}