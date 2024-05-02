
/*Importing required modules*/
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
const XLSX = require('xlsx');
const path = require('path');

/* Gen Ai related Detaills */
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


async function simulateInterview(companyName, position) {
	const companyInfo = await researchCompany(companyName, position);
	const generalQuestions = generateGeneralQuestions();
	const companySpecificQuestionsText = await generateCompanySpecificQuestions(companyInfo);
		
	// random question sfrom excel
	const workbook = XLSX.readFile(path.join(__dirname, 'dataset.xlsx'));
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const data = XLSX.utils.sheet_to_json(sheet);
	const previousYearQuestions = data
	.filter(row => row.companyName == companyName)
	.map(row => row.question);
    const interview = {
        companyInfo,
        generalQuestions,
        companySpecificQuestionsText,
		previousYearQuestions
    };
    return interview;
}

// Collects information about the company and role
async function researchCompany(companyName, position) {
	console.log(`Researching company: ${companyName}`);
	const prompt = `Suppose you are interviewer at ${companyName} for position ${position}, introduce yourself to the candidate. and your name is MockInterview Ai and your title is HR, you are represntative of SkillReview Company to take mock interviews.
	The introduction must be short, dont say the candidate's name`;
	// console.log(prompt); 
	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text;
}



// Generates general questions for the interview
function generateGeneralQuestions() {
	return [
		"Tell me about yourself.",
		"Why are you interested in this position?",
		"What are your strengths and weaknesses?",
	];
}

// Generates company-specific questions for the interview
async function generateCompanySpecificQuestions(companyInfo) {
	const prompt = `return an json object of questions for interviewe based on ${companyInfo}, ask questions
	which are mostly asked by company above, your name is MockInterview Ai and your title is HR. and interviewq questions should be COMPLETELY technical. THE QUESTIONS SHOULD BE IN JSON FORMAT. Directly reply with json object nothing after or before in response. 
	Dont pass any variables in the questions you provide.
	`;
	const result = await model.generateContent(prompt);
	const response = result.response;
	// console.log(response);
	try{
		const text = response.text();
		const json = JSON.parse(text);
		return json;
	}catch(err){
		return {};
	}
}

module.exports = {
    simulateInterview,
    researchCompany,
    generateGeneralQuestions,
    generateCompanySpecificQuestions,
};
