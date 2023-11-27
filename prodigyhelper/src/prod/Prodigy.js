/*
Code status - 
. Works with one word - one category
. Works with one word - multiple caategories
. Works with multiple words - one category
. Works with multiple words - multiple categories
. Works with jsonl data for text
. Works with random colors for categories
. Works with newline characters
. Doesnot work for unhighlighting the whole sentence when clicked a part of the sentence
. Doesnot work with mousedrag to the left
. Doesnot trim the words for "," and "__"
. Doesnot remove the selection after highlighting
. Doesnot add subtext
*/

import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
import './css/Prodigy.css';
import Icons from './Icons';
const Prodigy = ({ lines }) => {
  const [text, setText] = useState();
  const [categories] = useState(['COMPANY', 'LOCATION']);
  const [selectedCategory, setSelectedCategory] = useState('COMPANY');
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [lastClicked, setLastClicked] = useState(null);
  const [selectedWordsArray, setSelectedWordsArray] = useState([]);
  const [categoryColors, setCategoryColors] = useState({});

  const handleCategoryChange = (category) => { //Function - To change category state
    setSelectedCategory(category);
  };
  
  // console.log(words);
  
  const handleSubmit = () => {
    // Save selectedWordsArray in browser storage
    localStorage.setItem('selectedWordsArray', JSON.stringify(selectedWordsArray));
    
    console.log("Submitted!!");
    const savedSelectedWordsArray = JSON.parse(localStorage.getItem('selectedWordsArray'));
    console.log(savedSelectedWordsArray);
  }


  const toggleWordSelection = (lastClicked, wordId) => { //Triggered when mouseUp
    let updatedSelectedWordsArray = [...selectedWordsArray];
    let updatedCategory;
    let sentence = ''; //String - Sentence is taken null to avoid duplication
    
    let selectedWordIds = []; //Array - Ids of selected words (lastclicked - wordid)
    
    setWords((prevWords) =>
      prevWords.map((word) => {
        
        //To update category of all the words (lastclicked - wordid)
        if (word.id >= lastClicked && word.id <= wordId) 
        { 
          updatedCategory = [...word.category]; //Existing category is assigned
          const categoryIndex = updatedCategory.indexOf(selectedCategory); 
          
          //To check categories of the word
          if (categoryIndex !== -1) 
          {
            updatedCategory.splice(categoryIndex, 1); //If current category exists - it is removed
          } 
          else 
          {
            updatedCategory.push(selectedCategory); //If current category does not exist - current category is assigned
          }

          //To update data structure of the word
          const updatedWord = {
            ...word,
            isSelected: updatedCategory.length > 0,
            category: updatedCategory,
          };
          
          const wordIndex = updatedSelectedWordsArray.findIndex(
            (selectedWord) => selectedWord[0] === updatedWord.text,
          );
          
          //To check if the word is selected
          if (updatedWord.isSelected) 
          {
            if (wordIndex !== -1) 
            {
              updatedSelectedWordsArray[wordIndex][1] = updatedWord.category.join(', ');
              // updatedSelectedWordsArray[wordIndex][2] = [...updatedSelectedWordsArray[wordIndex][2], ...selectedWordIds];
            } 
            else 
            {
              updatedSelectedWordsArray.push([updatedWord.text, updatedWord.category, selectedWordIds]);
            }
            setSelectedWords((prevSelectedWords) => [...prevSelectedWords, updatedWord]);
            
            sentence = sentence.concat(updatedWord.text, ' '); //String - Text is appended to the sentence string
            selectedWordIds.push(updatedWord.id); //Array - Id of the word is pushed into the array
  
            return updatedWord;
          } 
          else 
          {
            setSelectedWords((prevSelectedWords) =>
              prevSelectedWords.filter((selectedWord) => selectedWord.id !== updatedWord.id)
            );
            if (wordIndex !== -1) 
            {
              updatedSelectedWordsArray.splice(wordIndex, 1);
            }
          }
          return updatedWord;
        } 
        else 
        {
          return word;
        }
        
      })
    );

    //Triggered 
    setSelectedWordsArray((prevSelectedWordsArray) => 
    {
      //const trimmedSentence = sentence.trim(); //Removes extra spaces at the end or start
      //const wordsArray = trimmedSentence.split(' '); //Array - Sentence split into words
      const uniqueSelectedWordIds = [...new Set(selectedWordIds)]; //Duplicates of the wordIds are removed
      //const uniqueWordsArray = [...new Set(wordsArray)];
    
      const existingArrayIndex = prevSelectedWordsArray.findIndex(
        (arr) => arr.startId === lastClicked && arr.endId === wordId
      );

      //
      if (existingArrayIndex !== -1) 
      {
        prevSelectedWordsArray[existingArrayIndex].category = updatedCategory;
        prevSelectedWordsArray[existingArrayIndex].wordIds = uniqueSelectedWordIds;
        prevSelectedWordsArray[existingArrayIndex].sentence = words.filter((word) => uniqueSelectedWordIds.includes(word.id)).map((word) => word.text).join(' ');
        prevSelectedWordsArray[existingArrayIndex].isSelected = updatedCategory.length > 0;
    
        // Splice the element if isSelected is false
        if (!prevSelectedWordsArray[existingArrayIndex].isSelected) 
        {
          prevSelectedWordsArray.splice(existingArrayIndex, 1);
        }
    
        return prevSelectedWordsArray;
      } 
      else 
      {

        // Add the element only if isSelected is true
        if (updatedCategory.length > 0) 
        {
          return [
            ...prevSelectedWordsArray,
            {
              startId: lastClicked,
              endId: wordId,
              wordIds: uniqueSelectedWordIds,
              sentence: words.filter((word) => uniqueSelectedWordIds.includes(word.id)).map((word) => word.text).join(' '),
              category: updatedCategory,
              isSelected: updatedCategory.length > 0,
            },
          ];
        } 
        else 
        {
          return prevSelectedWordsArray;
        }
      }
    });

    setLastClicked(null);
    
  };

  // Function to recognize words based on offset values
  const recognizeWords = () => {
    const wordsArray = (text ?? '').replace(/\\n/g, ' \n ').split(' ').map((word, index) => ({
      id: index,
      text: word,
      isSelected: false,
      category: [],
    }));
  
    setWords(wordsArray);
  };

  useEffect(() => {
    setText(JSON.stringify(lines).replace(/^"|"$/g, ''));
  }, [lines]);

  //Runs once when the prodigy component is rendered
  useEffect(() => {
    recognizeWords();
  }, [text]);

  //Triggered when lastclicked or selectedWordsArray is changed
  useEffect(() => {
    // console.log(selectedWordsArray);
  }, [lastClicked, selectedWordsArray]);

  useEffect(() => {
    const colors = {};
    categories.forEach((category) => {
      colors[category] = randomColor({
        luminosity:'light',
      });
    });
    setCategoryColors(colors);
  }, []);

  return (
    <div className='content'>
      <div className='testContent'>
        <div className='categoryContent'>
          {categories.map((category) => (
            <span key={category}>
              <input
                type='button'
                name='category'
                value={category}
                className='categoryButton'
                defaultChecked={selectedCategory === category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#fff' : 'transparent',
                  color: selectedCategory === category ? '#077ea4' : '#fff',
                  border: selectedCategory === category ? '1px solid #583FC' : '1px solid #fff',
                  
                }}
              />
            </span>
          ))}
        </div>
        <div className='testTextContent'>
          {words.map((word) => (
            <span
            key={word.id}
            onMouseUp={() => {
              toggleWordSelection(lastClicked, word.id);
            }}
            onMouseDown={() => {
              setLastClicked(word.id);
            }}
            style={{
              fontSize: '20px',
              backgroundColor: word.isSelected ? categoryColors[word.category[0]] || 'orange' : 'transparent',
              padding: '5px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {word.text}{' '}
            <sub style={{ fontSize: '12px', cursor: 'pointer' }}>
              {word.category.join(', ')}
            </sub>
          </span>
          ))}
        </div>
      </div>
      <Icons callHandleSubmit={handleSubmit} />
    </div>
  );
};

export default Prodigy;