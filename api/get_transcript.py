import requests
import json
import os

API_KEY = os.environ.get('financial_api_key')

def create_transcript_file(symbol, year, quater, content):
  """
  Create transcripts as txt files
  """
  try:
    file_path = symbol + '_' + str(year) + '_Q' + str(quater) + '_Earnings_Call_Transcript.txt' #'output.txt'
    file = open(file_path, 'w')
    file.write(content)
    file.close()  
  except Exception as e:
    print(f'Failed to create file: {file_path} due to {e}')

def get_transcript(years):
  """
  Get the apple transcripts based on the years provided
  """
  for year in years:
    symbols_url = 'https://financialmodelingprep.com/api/v4/batch_earning_call_transcript/AAPL?year='+ str(year) +'&apikey=' + API_KEY
    try:
      responses = requests.get(symbols_url).json()
      if responses:
        for response in responses:
          create_transcript_file(response['symbol'], response['year'], response['quarter'], response['content'])
    except Exception as e:
      print(f'Failed to query transcript: {e}, year: {year}')

if __name__ == "__main__":
  years = [2020, 2021, 2022, 2023]
  get_transcript(years)


