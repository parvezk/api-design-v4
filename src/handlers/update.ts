import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const getUpdates = async (req, res) => {
  const products: any = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);

  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const { productId, ...rest } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
      asset: "",
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products: any = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "nope" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const products: any = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.Update];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "nope" });
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
