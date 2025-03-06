from flask import Flask, json, request, jsonify
import os
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from flask_cors import cross_origin
from dotenv import load_dotenv
from langchain.prompts.prompt import PromptTemplate
from langchain_openai import ChatOpenAI


# Load environment variables from .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY is not set. Check your .env file.")

# Use API key in OpenAI client
import openai

client = openai.OpenAI(api_key=api_key)

# Load the trained model and scaler
model = joblib.load('alzheimers_risk_model.pkl')


app = Flask(__name__)
#CORS(app)
#CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})
#cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app, origins="http://localhost:3000", supports_credentials=True, methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

@app.route('/predict', methods=['GET', 'POST'])
@cross_origin() #add this before every endpoint
def predict():
    # Get data from POST request
    if request.is_json:
        data = request.get_json()

        # Extract features from the data
        ExerciseHours = data['ExerciseHours']
        EducationLevel = data['EducationLevel']
        BMI = data['BMI']
        #diet_quality = data['diet_quality']
        SleepHours = data['SleepHours']
        FamilyHistoryAlzheimersYN = data['FamilyHistoryAlzheimersYN']
        CardiovascularDiseaseYN = data['CardiovascularDiseaseYN']
        DiabetesYN = data['DiabetesYN']
        HeadInjuryYN = data['HeadInjuryYN']
        HypertensionYN = data['HypertensionYN']
        CholesterolLDL = data['CholesterolLDL']
        CholesterolHDL = data['CholesterolHDL']
        MemoryComplaintsYN = data['MemoryComplaintsYN']
        ADL = data['ADL']

        print("EducationLevel:")
        print(EducationLevel)
        print("BMI:")
        print(BMI)
        print("ExerciseHours:")
        print(ExerciseHours)
        print("SleepHours:")
        print(SleepHours)
        print("FamilyHistoryAlzheimersYN:")
        print(FamilyHistoryAlzheimersYN)
        print("CardiovascularDiseaseYN:")
        print(CardiovascularDiseaseYN)
        print("DiabetesYN:")
        print(DiabetesYN)
        print("HeadInjuryYN:")
        print(HeadInjuryYN)
        print("HypertensionYN:")
        print(HypertensionYN)
        print("CholesterolLDL:")
        print(CholesterolLDL)
        print("CholesterolHDL:")
        print(CholesterolHDL)
        print("MemoryComplaintsYN:")
        print(MemoryComplaintsYN)
        print("ADL:")
        print(ADL)

        # Convert JSON string to Python list
        #json_data = json.loads(data)
        
        print("============data=====================")
        print(data)

        # Convert to DataFrame
        df = pd.DataFrame([data])

        # Print DataFrame
        print(df)

        # Prepare the input data for prediction
        #input_features = np.array([[educationalBackground, bodyMassIndex, physicalActivity, sleepHours, familyHistoryAlzheimers, cardiovascularDisease, diabetes, headInjury, highBloodPressure, CholesterolLDL, hdlLevel, difficultyRemembering, difficultyTasks]])
        # Make prediction
        prediction = model.predict(df)
        print("============Prediction=====================")
        print(prediction[0])
        # Return the prediction as JSON
        result = {'risk': prediction[0], 'analysis':''}  # 0 for Low Risk, 1 for High Risk

        result['risk'] = "High" if result['risk'] == 1 else "Low"
        print("=====================result=============")               
        print(result)

        information = {
            #"EducationLevel": EducationLevel,
            "BMI": BMI,
            "ExerciseHours": ExerciseHours,
            "SleepHours": SleepHours,
            "FamilyHistoryAlzheimersYN": FamilyHistoryAlzheimersYN,
            "CardiovascularDiseaseYN": CardiovascularDiseaseYN,
            "DiabetesYN": DiabetesYN,
            "HeadInjuryYN": HeadInjuryYN,
            "HypertensionYN": HypertensionYN,
            "CholesterolLDL": CholesterolLDL,
            "CholesterolHDL": CholesterolHDL,
            "MemoryComplaintsYN": MemoryComplaintsYN,
            "ADL": ADL
        }
        summary_template = """ You are an expert on Alzheimer's disease. Given the information {information} about a person having Alzheimer's disease.:
            1. Provide a likelihood percentage based on information provided of them having Alzheimer's disease.
            2. two facts about their lifestyle that could be contributing to their risk of Alzheimer's disease.
            3. a recommendation for them to reduce their risk of Alzheimer's disease.                         
            """

        summmary_prompt_template = PromptTemplate(
        input_variables=["information"], template=summary_template
        )

        llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

        chain = summmary_prompt_template | llm
        res = chain.invoke(input={"information": information})

        result['analysis'] = res.content
        print(res.content)
    
        return result
    else:
        return jsonify({"error": "Request must be JSON"}), 400
  

if __name__ == '__main__':
    app.run(debug=True)
