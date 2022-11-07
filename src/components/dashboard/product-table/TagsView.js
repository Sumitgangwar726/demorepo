import {Tag, Stack} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

function TagView({isFilterChange}) {
  const [selectedTags, setSelectedTags] = useState([]);


    useEffect(()=>{
        let t = JSON.parse(sessionStorage.getItem('filter'))
        let sel = []
        console.log(t);
        sel = Object.keys(t).map((item)=>{
            console.log(item);
            if(item==='query'){
                return `Product ${t[item][1][1]} contains ${t[item][0]}`
            }
            else if(item==='tabSelected'){
                return `Product status equals ${t[item][0]}`
            }
            else if(t[item].change) {
                return `${item} ${t[item].selectValue} ${t[item].textValue}`
            }

        })
        console.log(sel);
        setSelectedTags(sel)

    },[isFilterChange])


  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    option && <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  return <Stack spacing="tight">{tagMarkup}</Stack>;
}

export default TagView