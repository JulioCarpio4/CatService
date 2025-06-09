
export const buildErrorResponse = (error: unknown) => {
  const errorInstance = error instanceof Error;
  return {
    status: error instanceof Error ? (error as any).status : 500,
    body: {
      status: 'FAILED',
      data: {
        error: errorInstance ? error.message : String(error)
      }
    }
  };
};