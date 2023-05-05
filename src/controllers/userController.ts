import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const saltRounds = 10; // costo del algoritmo de cifrado
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserModel.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};