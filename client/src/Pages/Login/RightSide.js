import React from 'react'

const RightSide = () => {
 return (
  <div className='col-md-6 col-12 col-sm-6'>
   <div className='padd-text fadeInLeft'>
    <small className='small-text'>About</small>
    <h2 className='title-h2'>Evangadi Networks</h2>
    <p className='font-p mg-bt-30'>
     No matter what stage of life you are in, whether you’re
     just starting elementary school or being promoted to CEO
     of a Fortune 500 company, you have much to offer to
     those who are trying to follow in your footsteps.
    </p>
    <p className='font-p mg-bt-30'>
     Wheather you are willing to share your knowledge or you
     are just looking to meet mentors of your own, please
     start by joining the network here.
    </p>
    <a href='/explained/' className='btn btn-blue'>
     How it works
    </a>
   </div>
  </div>
 )
}

export default RightSide