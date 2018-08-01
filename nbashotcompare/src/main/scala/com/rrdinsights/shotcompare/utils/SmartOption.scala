package com.rrdinsights.shotcompare.utils

object SmartOption {
  def apply[A <: { def isEmpty(): Boolean }](obj: A): Option[A] =
    if (obj == null || obj.isEmpty()) None else Some(obj)
}
