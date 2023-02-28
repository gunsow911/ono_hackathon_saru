import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/NoneLayout'

const ConsoleLogin: NextPageWithLayout = () => {
  return <></>
}

ConsoleLogin.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleLogin
