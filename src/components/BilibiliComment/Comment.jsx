import _ from 'lodash'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import './BiliComment.scss'
import avatar from './images/bozai.png'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: '13258165',
      avatar: '',
      uname: '周杰伦',
    },
    // 评论内容
    content: '哎哟，不错哦',
    // 评论时间
    ctime: '10-18 08:15',
    like: 108,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: '许嵩',
    },
    content: '我寻你千百度 日出到迟暮',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: '黑马前端',
    },
    content: '学前端就来黑马',
    ctime: '10-19 09:00',
    like: 666,
  },
]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'hot', text: '最热' },
  { type: 'time', text: '最新' },
]

const Comment = () => {

  // const [commentList, setCommentList] = useState(defaultList)
  // tab栏默认为最热 所以一开始就要处理排序
  const [commentList, setCommentList] = useState(_.orderBy(defaultList,['like'], 'desc'))

  const [type, setType] = useState('hot')

  // 输入框内容
  const [text,setText] = useState('')

  // 使用ref获取dom元素并且获取焦点
  const textareaRef = useRef(null)

  // 处理删除的函数
  const handleDelete = (uid) => {
    setCommentList(commentList.filter(item => item.rpid !== uid))
  }

  // 处理Tab栏的切换函数
  const handleChangeTab = (type) => {
    console.log(type);
    setType(type)
    // 处理排序功能 使用lodash库
    if(type === 'hot'){
      setCommentList(_.orderBy(commentList,['like'], 'desc'))
    }else{
      setCommentList(_.orderBy(commentList, ['ctime'], 'desc'))
    }
  }
  // 实现发布功能：
  // 1.首先实现输入框和state的双向绑定
  // 2.点击发布按钮后，使得列表更新并重新渲染
  // 3.清除输入框的内容，并且获得焦点
  //   获取焦点：
  //   使用ref
  // 处理发布功能的函数
  const handlePublish = () => {
    setCommentList(
      [
        {
          rpid: v4(),
          user: {
            uid: '30009257',
            avatar,
            uname: '黑马前端',
          },
          content: text,
          ctime: dayjs(new Date()).format('MM-DD HH:mm'),
          like: 666,
        },
        ...commentList,
      ]
    )
    // 清空内容并获取焦点
    setText("")
    textareaRef.current.focus()
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{commentList.length}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map(item => (<span key={item.type} onClick={() => handleChangeTab(item.type)} className={`nav-item ${type === item.type && 'active'}`} >{item.text}</span>))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {commentList.map(item => (
            <div key={item.rpid} className="reply-item">
              {/* 头像 */}
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    alt=""
                    src={item.user.avatar}
                  />
                </div>
              </div>

              <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                  <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */}
                <div className="root-reply">
                  <span className="reply-content">{item.content}</span>
                  <div className="reply-info">
                    {/* 评论时间 */}
                    <span className="reply-time">{item.ctime}</span>
                    {/* 评论数量 */}
                    <span className="reply-time">点赞数:{item.like}</span>
                    {(user.uid === item.user.uid) && <span className="delete-btn" onClick={() => handleDelete(item.rpid)}>
                      删除
                    </span>}

                  </div>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>
  )
}

export default Comment;