# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib  # To save the model
from sklearn.ensemble import RandomForestClassifier


# Set display options to show all rows and columns
pd.set_option('display.max_rows', None)   # Show all rows
pd.set_option('display.max_columns', None) # Show all columns

df = pd.read_csv("alzheimer_dataset.csv") 
# Sample dataset (replace with your actual dataset)

# Now print the entire DataFrame
print(df)


#data = {
#    'exercise_hours': [5, 3, 4, 6, 2, 7, 8, 4, 3, 6],
#    'diet_quality': [8, 5, 6, 7, 4, 9, 10, 6, 5, 7],
#    'sleep_hours': [8, 7, 6, 8, 7, 8, 8, 6, 7, 8],
#    'social_activity': [1, 0, 1, 1, 0, 1, 1, 0, 1, 1],  # 1: Active, 0: Not active
#    'cognitive_activity': [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],  # 1: Yes, 0: No
#    'risk': [1, 0, 1, 1, 0, 1, 0, 0, 0, 1]  # 1: High risk, 0: Low risk
#}

# Convert to DataFrame
# df = pd.DataFrame(data)

# Features and target
X = df[['EducationLevel', 'BMI', 'ExerciseHours', 'SleepHours', 'FamilyHistoryAlzheimersYN', 'CardiovascularDiseaseYN', 'DiabetesYN', 'HeadInjuryYN', 'HypertensionYN', 'CholesterolLDL', 'CholesterolHDL', 'MemoryComplaintsYN', 'ADL']]
y = df['DiagnosisYN']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocessing (scale features) 
# Random Forest doesn't require scaling
#scaler = StandardScaler()
#X_train_scaled = scaler.fit_transform(X_train)
#X_test_scaled = scaler.transform(X_test)

# Train a Logistic RandomForestClassifier model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model and scaler to disk
joblib.dump(model, 'alzheimers_risk_model.pkl')
#joblib.dump(scaler, 'scaler.pkl')

print("Model trained and saved successfully.")
