import catchAsync from '../../shared/catchAsync';

const notFoundRouteHandler = catchAsync(async (req, res) => {
  res.status(404).json({ message: 'route not found' });
});

export default notFoundRouteHandler;
