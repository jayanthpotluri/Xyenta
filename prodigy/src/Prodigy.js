import React, { useState, useEffect } from 'react';
const Prodigy = () => {
  const text = 'XYZ Tech Solutions, located at 123 Main Street, Cityville, is a leading company in innovative technology. XYZ Tech Solutions provides cutting-edge solutions for businesses and individuals alike. The companys main office, situated in Cityville, is easily accessible for clients. Additionally, the company has a branch at 456 Tech Avenue, Techlandia, catering to the growing demand in that region. XYZ Tech Solutions is committed to delivering high-quality services and products, making it a top choice for tech enthusiasts. Visit XYZ Tech Solutions today and experience excellence in technology!'  //Initializing value of text
  const [categories] = useState(['Company', 'Location']); //Array - Initializing value of categories
  const [selectedCategory, setSelectedCategory] = useState('Company'); // Selected category value based on mouse selection
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
    <div>
      <div 
      style={{
        border: '2px solid #000', 
        marginTop:'10px', 
        padding:'10px'}}>
        {categories.map((category) => (
          <span 
          key={category} 
          style={{
            fontSize:'25px',
            border: '2px solid #000', 
            marginRight:'5px',
            padding:'5px', }}>
            <input
              type='radio'
              name='category'
              value={category}
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </span>
        ))}
      </div>
      <div>
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
              fontSize: '25px',
              backgroundColor: word.isSelected ? 'orange' : 'transparent', //Highlighted as orange when isSelected is true else transparent
            }}
          >
            {word.text}{' '} {/*Each word that is split based on space is appended with a space*/}
            {/* <sub>{word.id === lastClicked ? `${word.category.join(', ')} ` : ''}</sub> */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Prodigy;