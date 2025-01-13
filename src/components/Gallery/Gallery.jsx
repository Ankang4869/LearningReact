import { useState } from "react";
import { sculptureList } from "./data";
import styles from './gallery.module.css';

const Gallery = () => {
	// 数组的索引
	const [index, setIndex] = useState(0)
	const [show, setShow] = useState(false)

	// 判断是否到达数组最后一个元素
	const hasNext = index < sculptureList.length - 1

	// 初始化一个对象 用于接收
	const item = sculptureList[index]

	const handleClick = () => {
		if(hasNext){
			console.log(item)
			setIndex(index + 1)
		}else{
			setIndex(0)
		}
		console.log(index)
	}

	const showDetail = () => {
		setShow(!show)
	}

  	return (
		<div className={styles.container}>
			<div>
				<button onClick={handleClick}>next</button>
			</div>
			<div>
				<h2>
					<i>{item.name} </i>
					by {item.artist}
				</h2>
				<p>({index + 1} of {sculptureList.length})</p>
				<button onClick={showDetail}>{show ? 'hide': 'show'}Detail</button>
				<br />
				<br />
				{show && <p>{item.description}</p>}
				<img src={item.url} alt={item.alt} width={200}/>
			</div>
		</div>
  );
};

export default Gallery;
