/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { NextRequest } from 'next/server'

import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = (req: NextRequest) => REST_GET(req, { config })
export const POST = (req: NextRequest) => REST_POST(req, { config })
export const DELETE = (req: NextRequest) => REST_DELETE(req, { config })
export const PATCH = (req: NextRequest) => REST_PATCH(req, { config })
export const OPTIONS = (req: NextRequest) => REST_OPTIONS(req, { config })
