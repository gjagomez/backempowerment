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
    const result = await pool.query(iSql);
    return result[0][0];
}
async function createEnc({empid,encno}){

}
async function endEnc({}){

}



module.exports={
    saveEmp,
    delEmp,
    getEmp
}