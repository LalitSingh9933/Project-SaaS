import sequelize from "../../model/connection"
import { Request, Response } from "express"
import generateRandomNumber from "../../services/generateInstituteNumber"


class InstituteController{

    async createInstitute(req:Request,res:Response){
        const body = req.body || {}
        const {instituteName,instituteEmail, institutePhoneNumber, instituteAddress} = body
        const instituteVatNo = body.instituteVatNo || null
        const institutePanNo = body.institutePanNo || null
        const instituteNumber = body.instituteNumber || generateRandomNumber()

        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress)
        {
            res.status(400).json({
                message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
            })
            return
        }

        try {
            await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
                id INT PRIMARY KEY AUTO_INCREMENT,
                instituteNumber INT NOT NULL UNIQUE,
                instituteName VARCHAR(255) NOT NULL,
                instituteEmail VARCHAR(255) NOT NULL UNIQUE,
                institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
                instituteAddress VARCHAR(255) NOT NULL,
                instituteVatNo VARCHAR(255),
                institutePanNo VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`)

            await sequelize.query(`
                INSERT INTO institute_${instituteNumber} (
                    instituteNumber,
                    instituteName,
                    instituteEmail,
                    institutePhoneNumber,
                    instituteAddress,
                    instituteVatNo,
                    institutePanNo
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, {
                replacements: [
                    instituteNumber,
                    instituteName,
                    instituteEmail,
                    institutePhoneNumber,
                    instituteAddress,
                    instituteVatNo,
                    institutePanNo
                ]
            })

sequelize.query(`CREATE TABLE teacher_${instituteNumber}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE)`)

            res.status(201).json({ message: "Institute created successfully", instituteNumber })
        } catch (error) {
            console.error("Failed to create institute table or insert institute data:", error)
            res.status(500).json({ message: "Failed to create institute table or insert institute data", error })
        }
    }
}

export default new InstituteController()
