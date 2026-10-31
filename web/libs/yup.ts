import * as yup from 'yup'
import * as ja from 'yup-locale-ja'
import { yupResolver as hookformYupResolver } from '@hookform/resolvers/yup'
import { FieldValues, Resolver } from 'react-hook-form'

yup.setLocale(ja.suggestive)
const $yup = yup

/**
 * フォーム型の一部だけを検証するスキーマを許容する yupResolver
 * (@hookform/resolvers v4以降はスキーマ推論型とフォーム型の完全一致を要求するため)
 */
export const yupResolver = <T extends FieldValues>(schema: yup.AnyObjectSchema) =>
  hookformYupResolver(schema) as unknown as Resolver<T>

export default $yup
