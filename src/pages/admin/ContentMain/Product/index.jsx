import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Switch, Redirect, } from 'react-router-dom';
import Home from './ProductHome'
import Loading from '../../../../components/isLoading';
import { fetchProduct } from '../../../../api/product'

const Detail = lazy(() => import('./Detail'));
const Update = lazy(() => import('./Update'));


export default function Product() {
  const [sumData, setSumData] = useState([]);
  const [dataSource, setSource] = useState([]);
  const [memKey, setMemKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetchProduct();
      res = res.map(v => {
        v.key = v.pid;
        return v;
      })
      setSource(res)
      setSumData(res);
    }
    fetchData();
  }, [])

  return (
    <Suspense fallback={<Loading></Loading>}>
      <Switch>
        <Route path="/product" exact render={() => <Home memKey={memKey} setMemKey={setMemKey} data={sumData} dataSource={dataSource} setSource={setSource} setSumData={setSumData} />}></Route>
        <Route path="/product/detail/:id" render={() => <Detail data={sumData}></Detail>}></Route>
        <Route path="/product/update/:id" render={() => <Update sumData={sumData} setSumData={(data) => setSumData(data)} setSource={(data) => setSource(data)}></Update>}></Route>
        <Redirect to="/product"></Redirect>
      </Switch>
    </Suspense>
  )
}
