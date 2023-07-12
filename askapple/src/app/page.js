"use client"
import Image from 'next/image'
import styles from './page.module.css'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'

import Spinner from './Spinner';

export default function Home() {
  const API_PATH = 'http://127.0.0.1:5000/ask_aapl'
  const STATUS = 200
  // const API_PATH = 'http://0.0.0.0:8000/query'
  // const TOKEN = 'Bearer 7586cf1e-24fa-471f-b913-dfe8d83bef65'
  // const headers = {
  //   'Content-Type': 'application/json',
  //   "Authorization": TOKEN,
  // };

  // const data = {"queries": [{"query": "what is apple's q1 in 2023. summarise in 30 words", "top_k": 5}]}
  // const postData = async () => {
  //   axios.post(API_PATH, data, {
  //     headers: headers
  //   })
  //   .then(res => {
  //     console.log(res);
  //     if (res.status == STATUS) {
  //       console.log(JSON.stringify(res))
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // };
  // postData()

  const fetchData = async (query) => {
    console.log(query)
    setQuery(query)
    setResult('')
    axios.get(API_PATH, {
      params: {
        query_prompt: query
      }
    }).then(res => {
      console.log(res)
      setResult(res.data.result)
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('Waiting...')
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.headingContainer} style={{'marginTop': '50px'}}>
          <h1 className={styles.heading}>Ask Me Anything APPLE</h1>
        </div>
        <textarea
          className={styles.textarea}
          rows={10}
          cols={100}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask a question about Apple Inc"
        />
        <button className={styles.primaryButton} style={{'marginTop': '30px', marginBottom: '30px'}} onClick={(e) => fetchData(query)}>Submit</button>
        <p className={styles.info} style={{marginBottom: '20px'}}>Query: {query ? query : 'Ask a question about Apple'}</p>
        {result.response ? <p className={styles.info} style={{marginLeft: '20px', marginRight: '20px'}}>{JSON.stringify(result.response)}</p> : result ? '' : <Spinner />}
        <ul>
          {result.sources && result.sources.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}


