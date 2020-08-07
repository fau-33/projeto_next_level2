const Database = require('./database/db')


const { 
  subjects,
  weekdays,
  getSubject,
  convertHoursToMinutes
} = require('./utils/format')


function pageLanding(req, res){
  return res.render("index.html")
}
async function pageStudy(req, res){
  const filters = req.query

  if(!filters.subject || !filters.weekday || !filters.time){
    return res.render("study.html", {filters, subjects, weekdays})
  }

  // converter horas em minutos
  const timeToMinutes = convertHoursToMinutes(filters.time)

  const query = `
  SELECT classes.*, proffys.*
  FROM proffys
  JOIN classes ON (classes.proffy_id = proffys.id)
  WHERE EXISTS (
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = classes.id
      AND class_schedule.weekday = ${ filters.weekday}
      AND class_schedule.time_from <= ${timeToMinutes}
      AND class_schedule.time_to > ${timeToMinutes}
  )
    AND classes.subject = '${filters.subject}'
  
  `
  //caso haja erro na hora da consulta do banco de dados
  try {

    const db = await Database
    const proffys = await db.all(query)

  } catch (error) {
    console.log(erro)
  }


  
}
function pageGiveClasses(req, res){
  const data = req.query

  const isNotEmpty = object.keys(data).length > 0
  //se tiver dados (data)
  if(isNotEmpty){

    data.subject = getSubject(data.subject)
    
    //Adicionar dados a lista proffys
    proffys.push(data)

    return res.render("/study")
  }
  

  //se não tiver, não adicionar

  return res.render("give-classes.html", {subjects, weekdays})
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses
}