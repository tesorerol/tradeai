const InfoPool = () => {
    return (
      <div className='container-infopool'>
          <div className='container-infopool-item'>
              <h2>Trades</h2>
              <div>
                  <p>0</p>
              </div>
          </div>
          <div className='container-infopool-item'>
              <h2>Total Trade Size</h2>
              <div>
                  <p>$0</p>
              </div>
          </div>
          <div className='container-infopool-item'>
              <h2>Pool Deposits</h2>
              <div>
                  <p>$0</p>
              </div>
          </div>
          <div className='container-infopool-item'>
              <h2>Profit</h2>
              <div>
                  <p className='color-green'>$0</p>
              </div>
          </div>
          <div className='container-infopool-item'>
              <h2>Win Rate</h2>
              <div>
                  <p>0</p>
              </div>
          </div>
      </div>
    )
  }
  
  export default InfoPool
  