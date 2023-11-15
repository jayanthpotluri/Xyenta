/*
Code status - 
1. Works with one word - one category
2. Works with one word - multiple caategories
3. Works with multiple words - one category
4. Works with multiple words - multiple categories
5. Doesnot work for unhighlighting the whole sentence when clicked a part of the sentence
6. Doesnot work with mousedrag to the left
7. Doesnot trim the words for "," and "__"
8. Doesnot remove the selection after highlighting
9. Doesnot add subtext
*/



import React, { useState, useEffect } from 'react';
import './css/Prodigy.css';
const Prodigy = () => {
  const text = 'XYZ Tech Solutions, located at 123 Main Street, Cityville, is a leading company in innovative technology. XYZ Tech Solutions provides cutting-edge solutions for businesses and individuals alike. The companys main office, situated in Cityville, is easily accessible for clients. Additionally, the company has a branch at 456 Tech Avenue, Techlandia, catering to the growing demand in that region. XYZ Tech Solutions is committed to delivering high-quality services and products, making it a top choice for tech enthusiasts. Visit XYZ Tech Solutions today and experience excellence in technology!'  //Initializing value of text
  const [categories] = useState(['COMPANY', 'LOCATION']); //Array - Initializing value of categories
  const [selectedCategory, setSelectedCategory] = useState('COMPANY'); // Selected category value based on mouse selection
  const [words, setWords] = useState([]); //Array - Consists of all the words that were split based on space
  const [selectedWords, setSelectedWords] = useState([]);
  const [lastClicked, setLastClicked] = useState(null); //(removed array) mouseDown value
  const [selectedWordsArray, setSelectedWordsArray] = useState([]); //Array - Consists of words that are selected, used for forming sentences

  const handleCategoryChange = (category) => { //Function - To change category state
    setSelectedCategory(category);
  };
  
  // console.log(words);
  

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
    const wordsArray = text.split(' ').map((word, index) => ({
      id: index,
      text: word,
      isSelected: false,
      category: [],
    }));
  
    setWords(wordsArray);
  };

  //Runs once when the prodigy component is rendered
  useEffect(() => {
    recognizeWords();
  }, []);

  //Triggered when lastclicked or selectedWordsArray is changed
  useEffect(() => {
    console.log(selectedWordsArray);
  }, [lastClicked, selectedWordsArray]);

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
                  color: selectedCategory === category ? '#583FCF' : '#fff',
                  border: selectedCategory === category ? '1px solid #583FC' : '1px solid #fff',
                  
                }}
              />
            </span>
          ))}
        </div>
        <div className='testTextContent'>
          {words.map((word) => (
            <span
              key={word.id} //The key to each word is the id assigned during split
              onMouseUp={() => {
                toggleWordSelection(lastClicked, word.id); // lastclicked and the end word of the drag is sent as parameters
              }}
              onMouseDown={() => {
                setLastClicked(word.id); //id of the first word of the drag is set as lastclicked
              }}
              style={{
                fontSize: '20px',
                backgroundColor: word.isSelected ? 'orange' : 'transparent',
                padding: '5px', // Add this line to set the padding
              }}>
              {word.text}{' '} {/*Each word that is split based on space is appended with a space*/}
              {/* <sub style={{ fontSize: '12px' }}>{word.id === lastClicked ? word.category.join(', ') : ''}</sub> */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prodigy;