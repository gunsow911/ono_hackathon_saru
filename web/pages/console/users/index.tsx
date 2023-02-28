import React from 'react'
import { NextPageWithLayout } from '_app'
import Layout from 'components/layouts/ConsoleLayout'

const ConsoleUserList: NextPageWithLayout = () => {
  return <></>
}

ConsoleUserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default ConsoleUserList
